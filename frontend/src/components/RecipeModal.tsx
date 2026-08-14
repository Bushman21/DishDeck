export const RecipeModal = () => {
    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>RECIPE TITLE</h2>
                    <span className="close-btn">&times;</span>
                </div>
                <div className="modal-body">
                    <p>RECIPE SUMMARY</p>
                </div>
            </div>
        </div>
    );
}