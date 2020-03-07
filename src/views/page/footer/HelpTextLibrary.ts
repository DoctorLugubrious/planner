import {ViewType} from "../../ViewTypes";
import HelpText from "./HelpText";
import {RubySpriteType} from "./RubySpriteType";

export default class HelpTextLibrary {
	private texts: Map<ViewType, HelpText>;

	constructor() {
		this.texts = new Map<ViewType, HelpText>([
             [ViewType.CALENDAR, new HelpText(
                 {text: 'This is the calendar!', sprite: RubySpriteType.GESTURE_POSE},
                 {text: 'Select any day to see what you have scheduled and plan for that day.', sprite: RubySpriteType.TALKING_EYES_CLOSED},
                 {text: 'The selected day will affect what you see on the daily plan screen and the day screen.', sprite: RubySpriteType.TALKING_EYES_CLOSED})],
             [ViewType.CHANGE_PASSWORD, new HelpText(
                 {text: 'Here you can change your password.', sprite: RubySpriteType.NEUTRAL_POSE})],
             [ViewType.DAILY_SCHEDULE, new HelpText(
                 {text: 'This is your schedule for the day.', sprite: RubySpriteType.NEUTRAL_POSE},
                 {text: 'From here, you can see what you have scheduled for the day, including set events as well as goals you have set for today.', sprite: RubySpriteType.TALKING_GESTURE_EYES_CLOSED},
	             {text: 'If you want to change what goals are for today, click on the "PLAN" button at the bottom of the screen.', sprite: RubySpriteType.TALKING_GESTURE})],
             [ViewType.DAILY_PLAN, new HelpText(
                 {text: 'Ahh, your daily planning screen. This is where the rubber hits the road.', sprite: RubySpriteType.TALKING},
                 {text: 'From here, you can see what goals have been assigned to today from your weekly plan.', sprite: RubySpriteType.TALKING_GESTURE},
                 {text: 'You can also create new daily events for things that come up so that you remember them.', sprite: RubySpriteType.TALKING})],
             [ViewType.LONG_TERM_GOALS, new HelpText(
                 {text: 'These are your long term goals. You can add new ones or decompose them into smaller steps.', sprite: RubySpriteType.NEUTRAL_POSE})],
             [ViewType.WEEKLY_EVENTS, new HelpText(
                 {text: 'These are your events that occur weekly.', sprite: RubySpriteType.NEUTRAL_POSE},
                 {text: 'Note that these are not goals, but events. Events are things that happen (e.g. "school", "work") and not goals to be accomplished (e.g. "clean room", "practice juggling").', sprite: RubySpriteType.NEUTRAL_POSE},
                 {text: 'And these aren\'t just events, these are events that occur at the same time every week.', sprite: RubySpriteType.NEUTRAL_POSE},
                 {text: 'Here you can add and delete these weekly events.', sprite: RubySpriteType.NEUTRAL_POSE})],
             [ViewType.ADD_GOAL, new HelpText(
                 {text: 'Here you can add long-term goals!', sprite: RubySpriteType.TALKING_GESTURE},
                 {text: 'These are goals that you do not know when you will accomplish, but you know you want to accomplish them.', sprite: RubySpriteType.TALKING_EYES_CLOSED},
                 {text: 'When you are ready to start on the steps to accomplish that goal, start to decompose it from the long-term goals screen.', sprite: RubySpriteType.TALKING})],
             [ViewType.ROLES, new HelpText(
                 {text: 'This screen lists your roles.', sprite: RubySpriteType.NEUTRAL_POSE},
                 {text: 'Roles are super important! Every goal you make should help you become what you want to be..', sprite: RubySpriteType.TALKING_EYES_CLOSED},
                 {text: 'You should think carefully about what roles you want to have in life: a family member, a church member, an employee, or whatever you want to be..', sprite: RubySpriteType.TALKING},
                 {text: 'You can add and delete those roles here. Be warned: deleting a role will also delete all goals for that role.', sprite: RubySpriteType.NEUTRAL_POSE})],
             [ViewType.MAIN, new HelpText(
                 {text: 'This is the main view! Here you can select any option to start planning,', sprite: RubySpriteType.NEUTRAL_POSE},
                 {text: 'If you are new to the rubidium planner, I recommend clicking on "roles" first and then asking me for help.', sprite: RubySpriteType.GESTURE_POSE})],
             [ViewType.YEARLY, new HelpText(
	             {text: 'These are your yearly goals. You can add new ones or decompose them into smaller steps.', sprite: RubySpriteType.NEUTRAL_POSE})],
             [ViewType.DECOMPOSE, new HelpText(
                 {text: 'This is the decompose view screen.', sprite: RubySpriteType.NEUTRAL_POSE},
                 {text: 'Here you can take a goal and break it down into smaller steps.', sprite: RubySpriteType.TALKING})],
             [ViewType.MONTHLY, new HelpText(
	             {text: 'These are your monthly goals. You can add new ones or decompose them into smaller steps.', sprite: RubySpriteType.NEUTRAL_POSE})],
             [ViewType.CONTINUOUS, new HelpText(
                 {text: 'These are your continuous goals.', sprite: RubySpriteType.NEUTRAL_POSE},
                 {text: 'Sometimes you need a goal to happen every week or every day. These goals are for just that!', sprite: RubySpriteType.NEUTRAL_POSE})],
             [ViewType.WEEKLY_GOALS, new HelpText(
	             {text: 'On the weekly planning screen, you can assign your goals for this week to days this week.', sprite: RubySpriteType.NEUTRAL_POSE},
	             {text: 'When you assign a goal, it will go to the weekday specified in the next week.', sprite: RubySpriteType.TALKING_EYES_CLOSED},
	             {text: 'You can also add new weekly goals or edit old ones.', sprite: RubySpriteType.TALKING_EYES_CLOSED})],
             [ViewType.ADD_SCHEDULED_EVENT, new HelpText(
                 {text: 'Scheduled Events are events that happen only once. They are not goals.', sprite: RubySpriteType.NEUTRAL_POSE})],
             [ViewType.EDIT_SCHEDULED_EVENT, new HelpText(
                 {text: 'Edit a scheduled event!', sprite: RubySpriteType.NEUTRAL_POSE})]
         ]);
	}

	getText(view: ViewType) {
		let temp: HelpText | undefined = this.texts.get(view);
		let res: HelpText = new HelpText({
			                                 text: 'umm. I\'m terribly sorry, but I do not recognize what this view does.',
			                                 sprite: RubySpriteType.TALKING_EYES_CLOSED
		                                 });
		if (temp !== undefined) {
			res = temp;
		}
		return res;
	}
}