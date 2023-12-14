import classNames from "classnames";
import { RecommendedTypes } from "../(recommended)/page";

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
                )}
                aria-label="following-button">
                Following
            </button>

            <button onClick={() => onRecommendTypeChange && onRecommendTypeChange("FORYOU")}
                className={classNames(
                    "italic",
                    {
                        "underline": currentRecommendedType == "FORYOU"
                    }
                )}
                aria-label="foryou-button">
                For You
            </button>
        </div>
    );
}