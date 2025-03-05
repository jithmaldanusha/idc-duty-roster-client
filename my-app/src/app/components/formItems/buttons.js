import './styles.css';

export function ClearButton({ onClick }) {
    return (
        <div className="text-center text-lg-start mt-4 pt-2">
            <button
                type="button"
                className="clearbtn btn btn-lg rounded-5 fs-6 fw-bold me-1"
                onClick={onClick}
            >
                Clear
            </button>
        </div>
    );
}

export function CancelButton({ onClick }) {
    return (
        <div className="text-center text-lg-start mt-4 pt-2">
            <button
                type="button"
                className="clearbtn btn btn-lg rounded-5 fs-6 fw-bold me-1"
                onClick={onClick}
            >
                Cancel
            </button>
        </div>
    );
}

export function LoginButton({ onClick }) {
    return (
        <div className="text-center text-lg-start mt-4 pt-2">
            <button
                type="button"
                className="loginbtn btn btn-lg rounded-5 fs-6 fw-bold me-1"
                onClick={onClick}
            >
                Login
            </button>
        </div>
    );
}

export function SubmitButton({ onClick, lableName }) {
    return (
        <div className="text-center text-lg-start mt-4 pt-2">
            <button
                type="submit"
                className="submitbtn btn btn-lg rounded-5 fs-6 fw-bold me-1"
                onClick={onClick}
            >
                {lableName}
            </button>
        </div>
    );
}

export function ContinueButton({ onClick }) {
    return (
        <div className="text-center text-lg-start mt-4 pt-2">
            <button
                type="button"
                className="continuebtn btn btn-lg rounded-5 fs-6 fw-bold me-1"
                onClick={onClick}
            >
                Continue
            </button>
        </div>
    );
}

export function OkButton({ onClick }) {
    return (
        <div className="text-center text-lg-start mt-4 pt-2">
            <button
                type="button"
                className="continuebtn btn btn-lg rounded-5 fs-6 fw-bold me-1"
                onClick={onClick}
            >
                Ok
            </button>
        </div>
    );
}

export function AddButton({ onClick, lableName }){
    return (
        <div className="text-center text-lg-start">
            <button
                type="button"
                className="btn btn-sm btn-secondary shadow-lg rounded-4 fs-6 ms-1"
                onClick={onClick}
            >
                {lableName}
            </button>
        </div>
    );
}