import Model from "../../model/Model";
import {ViewType} from "../ViewTypes";
import {GoalType} from "../../goalData/GoalType";


let DecomposeFinishFunction = (model: Model) => {
	let view : ViewType = ViewType.DECOMPOSE;
	switch(model.currentlyWorking) {
		case GoalType.LONG_TERM:
			view = ViewType.LONG_TERM_GOALS;
			break;
		case GoalType.YEARLY:
			view = ViewType.YEARLY;
			break;
		case GoalType.MONTHLY:
			view = ViewType.MONTHLY;
			break;
		case GoalType.WEEKLY:
			view = ViewType.WEEKLY_GOALS;
	}
	return ()=>model.changeView(view);
};

export default DecomposeFinishFunction;