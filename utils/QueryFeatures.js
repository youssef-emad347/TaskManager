export default class QueryFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const { page, limit, search, sort, ...filters } = this.queryString;
        if (search) {
            filters.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }
        this.query = this.query.find(filters);
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else this.query = this.query.sort("-createdAt");
        return this;
    }

    paginate() {
        const [page, limit] = [
            parseInt(this.queryString.page),
            parseInt(this.queryString.limit),
        ];
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
