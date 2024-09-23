export default class ApiResponse {
  constructor(success, code, data, message) {
    this.success = success;
    this.code = code;
    this.data = data;
    this.message = message;
  }
}
