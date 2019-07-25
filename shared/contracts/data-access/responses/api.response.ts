import { StatusCode } from '../../http/status-code'

export class ApiResponse<T> {
    constructor(
        public body: T = {} as T,
        public status: StatusCode
    ) { }
}
