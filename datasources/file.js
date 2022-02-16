const employees = require("../data/employees.json");

const { DataSource } = require('apollo-datasource');
const _ = require('lodash')

class EmployeeService extends DataSource {
  constructor() {
    super();
  }

  initialize(confi) {

  }

  getEmployees(args){
      return _.filter(employees,args);
  }

  getEmployeesById(id){
    return employees.filter(function(employee){
        return employee.id == id;
    });
}
}

module.exports = EmployeeService;