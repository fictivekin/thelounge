import constants from "../../constants";
import {Part} from "./merge";

const sebRegExp = /:([0-9a-zA-Z]+):/gi;
const sebs = constants.sebs;

export type SebPart = Part & {
	seb: string[];
};

function findSebs(text: string): SebPart[] {
	const result: SebPart[] = [];

	// Return early if we don't have any sebs to find
	if (!sebs) {
		return result;
	}

	// const sebsTrimmed = sebs.map(function (seb) {
	// 	return seb[2];
	// });

	let match: RegExpExecArray | null;

	while ((match = sebRegExp.exec(text))) {
		const matchedSeb = sebs[match[1]];

		if (matchedSeb) {
			result.push({
				start: match.index,
				end: match.index + match[0].length,
				seb: [match[0], matchedSeb],
			});
		}
	}

	return result;
}

export default findSebs;
