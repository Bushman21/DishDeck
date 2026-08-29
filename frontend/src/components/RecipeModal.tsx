import { useEffect, useState } from "react";
import * as RecipeAPI from '../api';

interface props {
    recipeId: string;
    onClick: () => void;
}

export const RecipeModal = ({ recipeId }: props) => {
    const [recipeSummary, setRecipeSummary] = useState<string | null>(null);
    useEffect(() => {
        const fetchRecipeSummary = async () => {
            try {
                const summary = RecipeAPI.getRecipeSummary(recipeId);
                setRecipeSummary(summary);
            } catch (error) {
                console.error("Error fetching recipe summary:", error);
            }
        };

        fetchRecipeSummary();
    }, [recipeId]);
    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                    <h2>{recipeSummary.title}</h2>
                    <span className="close-btn">&times;</span>
                    </div>
                </div>
                <div className="modal-body">
                    <p>{recipeSummary}</p>
                </div>
            </div>
        </div>
    );
}