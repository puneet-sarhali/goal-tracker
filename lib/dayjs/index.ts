import dayjs from "dayjs"
import timeZone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

var isSameOrBefore = require("dayjs/plugin/isSameOrBefore")

dayjs.extend(utc)
dayjs.extend(timeZone)
dayjs.extend(isSameOrBefore)

export type Dayjs = dayjs.Dayjs
export default dayjs
