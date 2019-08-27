import {ViewType} from "../../ViewTypes";
import HelpText from "./HelpText";
import {RubySpriteType} from "./RubySpriteType";

export default class HelpTextLibrary {
	private texts: Map<ViewType, HelpText>;

	constructor() {
		this.texts = new Map<ViewType, HelpText>([
			                                         [ViewType.CALENDAR, new HelpText(
				                                         {text: '', sprite: RubySpriteType.GESTURE_POSE},
				                                         {text: '', sprite: RubySpriteType.TALKING_EYES_CLOSED})],
			                                         [ViewType.CHANGE_PASSWORD, new HelpText(
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE},
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE})],
			                                         [ViewType.DAILY_SCHEDULE, new HelpText(
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE},
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE})],
			                                         [ViewType.DAILY_EVENTS, new HelpText(
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE},
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE})],
			                                         [ViewType.LONG_TERM_GOALS, new HelpText(
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE},
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE})],
			                                         [ViewType.WEEKLY_EVENTS, new HelpText(
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE},
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE})],
			                                         [ViewType.ADD_GOAL, new HelpText(
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE},
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE})],
			                                         [ViewType.ROLES, new HelpText(
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE},
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE})],
			                                         [ViewType.LOGIN, new HelpText(
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE},
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE})],
			                                         [ViewType.MAIN, new HelpText(
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE},
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE})],
			                                         [ViewType.YEARLY, new HelpText(
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE},
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE})],
			                                         [ViewType.DECOMPOSE, new HelpText(
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE},
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE})],
			                                         [ViewType.MONTHLY, new HelpText(
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE},
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE})],
			                                         [ViewType.CONTINUOUS, new HelpText(
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE},
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE})],
			                                         [ViewType.WEEKLY_GOALS, new HelpText(
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE},
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE})],
			                                         [ViewType.ADD_SCHEDULED_EVENT, new HelpText(
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE},
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE})],
			                                         [ViewType.EDIT_SCHEDULED_EVENT, new HelpText(
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE},
				                                         {text: '', sprite: RubySpriteType.NEUTRAL_POSE})]
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