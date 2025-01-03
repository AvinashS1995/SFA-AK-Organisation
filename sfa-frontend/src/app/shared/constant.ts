import { SelectInputItem } from './interfaces/common'

const REGEX_EMAIL: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_ONLY_NUMBER: RegExp = /^[0-9]*$/;
const REGEX_EMP_NO: RegExp = /^[0-9]{5,7}$/;
const REGEX_PASSWORD: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
const REGEX_ADHAAR: RegExp = /^[0-9]{12}$/;
const REGEX_PAN: RegExp = /^([a-zA-Z]){3}(P|p)([a-zA-Z]){1}([0-9]){4}([a-zA-Z]){1}?$/;
const REGEX_NUM_NO_ZERO_START: RegExp = /^([1-8])$/;
const REGEX_BLOOD_GROUP: RegExp = /^(A|B|AB|O)[+-]$/;
const REGEX_NUM_NO_ZERO_START_INFINITE: RegExp = /^(0|[1-9][0-9]*)$/;
const REGEX_DECIMAL_NUMBER: RegExp = /^\d+(\.\d{1,2})?$/;
const ONLY_ALPHABETS: RegExp = /^([A-Za-z]+)(\s([A-Za-z]+))?(\s([A-Za-z]+))?$/;
const ALPHA_WITH_SPACE: RegExp = /^[a-zA-Z ]*$/;
const MOBILE_NUMBER: RegExp = /^\d{10}$/;
const ONLY_ALPHABETS_WITH_NO_SPACING_ON_START_AND_END: RegExp = /^[A-Za-z]+(?: [A-Za-z]+)*$/

export { REGEX_EMAIL, REGEX_ONLY_NUMBER, REGEX_EMP_NO, REGEX_PASSWORD, REGEX_ADHAAR, REGEX_PAN, REGEX_NUM_NO_ZERO_START, REGEX_BLOOD_GROUP, REGEX_NUM_NO_ZERO_START_INFINITE, REGEX_DECIMAL_NUMBER, ONLY_ALPHABETS, ALPHA_WITH_SPACE, MOBILE_NUMBER, ONLY_ALPHABETS_WITH_NO_SPACING_ON_START_AND_END };


const GENDER_DROPDOWN: Array<any> = [
  { value: "1", label: "Male" },
  { value: "0", label: "Female" },
];

const BLOOD_GROUP: Array<any> = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" }
];

const MONTHS: Array<any> = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
]

const DAYS: Array<any> = [
  { label: "Monday", value: "Mon" },
  { label: "Tuesday", value: "Tue" },
  { label: "Wednesday", value: "Wed" },
  { label: "Thursday", value: "Thu" },
  { label: "Friday", value: "Fri" },
  { label: "Saturday", value: "Sat" },
  { label: "Sunday", value: "Sun" },
];

export { GENDER_DROPDOWN, BLOOD_GROUP, MONTHS, DAYS }