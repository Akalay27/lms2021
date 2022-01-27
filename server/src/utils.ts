import { User } from "./entity/User";
import { Week } from "./entity/Week";

export const updateWeekStudents = async () => {

    let weeks = (await Week.find({}));
  
    (await weeks).map(async (week) => {
        
        week.students = await User.count({signup_date: week.date, type: 'paid'})
        week.save();
    });
}