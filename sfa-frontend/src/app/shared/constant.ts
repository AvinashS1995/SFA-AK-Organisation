const API_ENDPOINTS = {
    serviceName_login: 'authenticateUser/login',
    serviceName_signup: 'authenticateUser/signup'
}

// Use regex for JavaScript ('\' is a escape charector hence use it twice)
const REGEX = {
    PASSWORD_REGEX: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
}

export {API_ENDPOINTS, REGEX}