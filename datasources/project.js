const {RESTDataSource} = require('apollo-datasource-rest')

class ProjectService extends RESTDataSource{

    constructor(){
        super();
        this.baseURL = 'http://localhost:3000'
    }

    async getProjects(){
        return await this.get('/projects')
    }

    async getProjectsById (id) {
        return await this.get(`/projects/${id}`)
    }
}

module.exports = ProjectService