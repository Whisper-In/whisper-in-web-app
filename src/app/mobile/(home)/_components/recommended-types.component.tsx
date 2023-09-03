import classNames from "classnames";
import { RecommendedTypes } from "../page";

export default function RecommendedTypesNav({ className, currentRecommendedType, onRecommendTypeChange }
    : {
        className?: string, currentRecommendedType: RecommendedTypes,
        onRecommendTypeChange?: (recommendedType: RecommendedTypes) => void
    }) {
    return (
        <div className={classNames(
            "flex gap-10 text-white text-xl underline-offset-4 whitespace-nowrap drop-shadow",
            className
        )}>
            <button onClick={() => onRecommendTypeChange && onRecommendTypeChange("FOLLOWING")}
                className={classNames(
                    "italic",
                    {
                        "underline": currentRecommendedType == "FOLLOWING"
                    }
                )}>
                Following
            </button>

            <button onClick={() => onRecommendTypeChange && onRecommendTypeChange("FORYOU")}
                className={classNames(
                    "italic",
                    {
                        "underline": currentRecommendedType == "FORYOU"
                    }
                )}>
                For You
            </button>
        </div>
    );
}