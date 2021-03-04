//class blueprint for an object
const fileService = require('../services/fileService');

class Department {
  constructor(filePath) {
    this.filePath = filePath;
    console.log('new department object created');
  }
  getDepartments() {
    const employees = this.getData();
    const departments = employees.map((employee) => employee.department);
    //set property value
    return [...new Set(departments)];
  }

  getDepartmentByName(name) {
    //return everyone in the department
    //employee.filter(employee=>employee.department=name)
    const employees = this.getData();
    const result = employees.filter((employee) => (employee.department = name));
    return result;
  }
  getData() {
    return fileService.getFileContents(this.filePath);
  }
}

module.exports = Department;
