class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    console.log(`features queryStr ${queryStr}`);
    console.log(`features queryStr stringified ${JSON.stringify(queryStr)}`);
  }
  filter() {
    const queryObj = { ...this.queryStr };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    const { search } = queryObj;
    let queryFilterObj = {};

    if (search) {
      queryFilterObj.$or = [
        { clientFirstName: { $regex: search, $options: 'i' } },
        { clientLastName: { $regex: search, $options: 'i' } }
      ];
      // queryFilterObj.$or = [
      //   { puppyTempName: { $regex: search, $options: 'i' } },
      //   { puppyColor: { $regex: search, $options: 'i' } }
      // ];
    }

    let queryStr = JSON.stringify(queryFilterObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte\lt)\b/g, (match) => `$${match}`);
    console.log(`filter queryStr ${queryStr}`);
    queryFilterObj = JSON.parse(queryStr);
    this.query = this.query.find(queryFilterObj);
    return this;
  }

  sort() {
    const sortOptions = {
      newest: '-createdAt',
      oldest: 'createdAt',
      'a-z': 'clientFirstName',
      'z-a': '-clientFirstName'
      // 'a-z': 'puppyTempName',
      // 'z-a': '-puppyTempName'
    };

    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      const sortKey = sortOptions[sortBy] || sortOptions.newest;
      console.log(`apiFeatures sort sortKey ${sortKey}`);
      // this.query = this.query.sort(sortBy);
      this.query = this.query.sort(sortKey);
      console.log(`apiFeatures sortBy ${sortBy}`);
    }
    return this;
  }
  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  paginate() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;
