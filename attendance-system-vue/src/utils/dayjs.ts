import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween' // import plugin

dayjs.extend(isBetween) // use plugin

export default dayjs
