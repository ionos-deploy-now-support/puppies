const PAGINATION_LIMIT = require('./constants2');
class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  filter() {
    const queryObj = { ...this.queryStr };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    const { search, puppySex, puppyColor, litter } = queryObj;

    let queryFilterObj = {};

    if (search) {
      queryFilterObj.$or = [
        { puppyTempName: { $regex: search, $options: 'i' } },
        { clientFirstName: { $regex: search, $options: 'i' } },
        { clientLastName: { $regex: search, $options: 'i' } },
        { litterName: { $regex: search, $options: 'i' } },
        { litter: { $regex: search, $options: 'i' } }
      ];
    }
    if (puppySex && puppySex !== 'Both') {
      queryFilterObj.puppySex = puppySex;
    }
    if (puppyColor && puppyColor !== 'All') {
      queryFilterObj.puppyColor = puppyColor;
    }
    if (litter && litter !== 'All') {
      queryFilterObj.litter = litter;
    }

    let queryStr = JSON.stringify(queryFilterObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte\lt)\b/g, (match) => `$${match}`);
    queryFilterObj = JSON.parse(queryStr);
    this.query = this.query.find(queryFilterObj);
    return this;
  }

  sort() {
    const sortOptions = {
      newest: '-createdAt',
      oldest: 'createdAt',
      'a-z': 'clientFirstName',
      'z-a': '-clientFirstName',
      'a-z': 'puppyTempName',
      'z-a': '-puppyTempName',
      'a-z': 'litterName',
      'z-a': '-litterName'
    };

    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      const sortKey = sortOptions[sortBy] || sortOptions.newest;
      this.query = this.query.sort(sortKey);
    } else {
      // sort by newest entry by default if no sort params
      this.query = this.query.sort('-createdAt');
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
    const limit = this.queryStr.limit * 1 || PAGINATION_LIMIT;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;
