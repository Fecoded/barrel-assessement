

export const getStatus = (status: string) => {
		if (status === "Delivered") {
			return "green";
		} else if (status === "Processing") {
			return "orange";
		} else if (status === "In-Transit") {
			return "teal";
		} else {
			return "red";
		}
	};
