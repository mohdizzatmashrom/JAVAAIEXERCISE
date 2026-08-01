const http = require("http");

const PORT = 8081;

let events = [
    {
        id: "EV001",
        title: "Tech Career Fair",
        date: "2026-08-10",
        venue: "Kuala Lumpur Convention Centre",
        availableSeats: 120
    },
    {
        id: "EV002",
        title: "Web Development Bootcamp",
        date: "2026-08-15",
        venue: "Digital Learning Hub",
        availableSeats: 35
    },
    {
        id: "EV003",
        title: "AI for Business Workshop",
        date: "2026-08-20",
        venue: "Innovation Centre",
        availableSeats: 50
    }
];

let bookings = [];

let courseOfferings = [
    {
        id: "CO001",
        courseTitle: "Java Fundamentals",
        instructorName: "Mr Tan",
        startDate: "2026-07-15",
        capacity: 25,
        status: "OPEN"
    },
    {
        id: "CO002",
        courseTitle: "React Basics",
        instructorName: "Ms Lee",
        startDate: "2026-07-22",
        capacity: 20,
        status: "OPEN"
    }
];

let instructors = [
    {
        id: "I001",
        name: "Mr Tan",
        specialty: "Java",
        yearsExperience: 8,
        available: true
    },
    {
        id: "I002",
        name: "Ms Lee",
        specialty: "React",
        yearsExperience: 6,
        available: true
    },
    {
        id: "I003",
        name: "Mr Kumar",
        specialty: "Spring Boot",
        yearsExperience: 10,
        available: false
    }
];

function corsHeaders() {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
    };
}

function sendJson(response, statusCode, data) {
    response.writeHead(statusCode, corsHeaders());
    response.end(JSON.stringify(data, null, 2));
}

function readJsonBody(request) {
    return new Promise((resolve, reject) => {
        let body = "";

        request.on("data", chunk => {
            body += chunk;
        });

        request.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(error);
            }
        });
    });
}

function createId(prefix, currentLength) {
    return `${prefix}${String(currentLength + 1).padStart(3, "0")}`;
}

function validateCourseOffering(payload) {
    const errors = [];

    if (!payload.courseTitle || payload.courseTitle.trim() === "") {
        errors.push({ field: "courseTitle", message: "Course title is required" });
    }

    if (!payload.instructorName || payload.instructorName.trim() === "") {
        errors.push({ field: "instructorName", message: "Instructor name is required" });
    }

    if (!payload.startDate || payload.startDate.trim() === "") {
        errors.push({ field: "startDate", message: "Start date is required" });
    }

    if (!Number.isInteger(payload.capacity) || payload.capacity < 1) {
        errors.push({ field: "capacity", message: "Capacity must be a whole number greater than 0" });
    }

    return errors;
}

function validateInstructor(payload) {
    const errors = [];

    if (!payload.name || payload.name.trim() === "") {
        errors.push({ field: "name", message: "Name is required" });
    }

    if (!payload.specialty || payload.specialty.trim() === "") {
        errors.push({ field: "specialty", message: "Specialty is required" });
    }

    if (!Number.isInteger(payload.yearsExperience) || payload.yearsExperience < 0) {
        errors.push({ field: "yearsExperience", message: "Years of experience must be 0 or more" });
    }

    return errors;
}

function validateBooking(payload) {
    const errors = [];

    if (!payload.eventId || payload.eventId.trim() === "") {
        errors.push({ field: "eventId", message: "Event ID is required" });
    }

    if (!payload.participantName || payload.participantName.trim() === "") {
        errors.push({ field: "participantName", message: "Participant name is required" });
    }

    if (!payload.participantEmail || payload.participantEmail.trim() === "") {
        errors.push({ field: "participantEmail", message: "Participant email is required" });
    }

    if (!Number.isInteger(payload.seats) || payload.seats < 1) {
        errors.push({ field: "seats", message: "Seats must be a whole number greater than 0" });
    }

    return errors;
}

const server = http.createServer(async (request, response) => {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const method = request.method;

    if (method === "OPTIONS") {
        response.writeHead(204, corsHeaders());
        response.end();
        return;
    }

    try {
        if (method === "GET" && url.pathname === "/api/health") {
            sendJson(response, 200, { status: "UP", service: "day-5-mock-api" });
            return;
        }

        if (method === "GET" && url.pathname === "/api/events") {
            sendJson(response, 200, events);
            return;
        }

        const eventMatch = url.pathname.match(/^\/api\/events\/([^/]+)$/);

        if (method === "GET" && eventMatch) {
            const id = eventMatch[1];
            const found = events.find(item => item.id === id);

            if (!found) {
                sendJson(response, 404, { message: `Event ${id} was not found` });
                return;
            }

            sendJson(response, 200, found);
            return;
        }

        if (method === "GET" && url.pathname === "/api/bookings") {
            sendJson(response, 200, bookings);
            return;
        }

        const bookingMatch = url.pathname.match(/^\/api\/bookings\/([^/]+)$/);

        if (method === "GET" && bookingMatch) {
            const id = bookingMatch[1];
            const found = bookings.find(item => item.id === id);

            if (!found) {
                sendJson(response, 404, { message: `Booking ${id} was not found` });
                return;
            }

            sendJson(response, 200, found);
            return;
        }

        if (method === "POST" && url.pathname === "/api/bookings") {
            const payload = await readJsonBody(request);
            const errors = validateBooking(payload);

            if (errors.length > 0) {
                sendJson(response, 400, { message: "Validation failed", errors });
                return;
            }

            const event = events.find(item => item.id === payload.eventId);

            if (!event) {
                sendJson(response, 404, { message: `Event ${payload.eventId} was not found` });
                return;
            }

            if (payload.seats > event.availableSeats) {
                sendJson(response, 400, { message: "Not enough seats available" });
                return;
            }

            const created = {
                id: createId("BK", bookings.length),
                eventId: payload.eventId,
                participantName: payload.participantName.trim(),
                participantEmail: payload.participantEmail.trim(),
                seats: payload.seats,
                status: "CONFIRMED"
            };

            bookings.push(created);
            event.availableSeats = event.availableSeats - payload.seats;

            sendJson(response, 201, created);
            return;
        }

        if (method === "DELETE" && bookingMatch) {
            const id = bookingMatch[1];
            const booking = bookings.find(item => item.id === id);

            if (!booking) {
                sendJson(response, 404, { message: `Booking ${id} was not found` });
                return;
            }

            if (booking.status === "CANCELLED") {
                sendJson(response, 400, { message: `Booking ${id} has already been cancelled` });
                return;
            }

            const event = events.find(item => item.id === booking.eventId);

            if (event) {
                event.availableSeats = event.availableSeats + booking.seats;
            }

            booking.status = "CANCELLED";

            sendJson(response, 200, booking);
            return;
        }

        if (method === "GET" && url.pathname === "/api/course-offerings") {
            sendJson(response, 200, courseOfferings);
            return;
        }

        const courseOfferingMatch = url.pathname.match(/^\/api\/course-offerings\/([^/]+)$/);

        if (method === "GET" && courseOfferingMatch) {
            const id = courseOfferingMatch[1];
            const found = courseOfferings.find(item => item.id === id);

            if (!found) {
                sendJson(response, 404, { message: `Course offering ${id} was not found` });
                return;
            }

            sendJson(response, 200, found);
            return;
        }

        if (method === "POST" && url.pathname === "/api/course-offerings") {
            const payload = await readJsonBody(request);
            const errors = validateCourseOffering(payload);

            if (errors.length > 0) {
                sendJson(response, 400, { message: "Validation failed", errors });
                return;
            }

            const created = {
                id: createId("CO", courseOfferings.length),
                courseTitle: payload.courseTitle.trim(),
                instructorName: payload.instructorName.trim(),
                startDate: payload.startDate.trim(),
                capacity: payload.capacity,
                status: "OPEN"
            };

            courseOfferings.push(created);
            sendJson(response, 201, created);
            return;
        }

        if (method === "GET" && url.pathname === "/api/instructors") {
            sendJson(response, 200, instructors);
            return;
        }

        const instructorMatch = url.pathname.match(/^\/api\/instructors\/([^/]+)$/);

        if (method === "GET" && instructorMatch) {
            const id = instructorMatch[1];
            const found = instructors.find(item => item.id === id);

            if (!found) {
                sendJson(response, 404, { message: `Instructor ${id} was not found` });
                return;
            }

            sendJson(response, 200, found);
            return;
        }

        if (method === "POST" && url.pathname === "/api/instructors") {
            const payload = await readJsonBody(request);
            const errors = validateInstructor(payload);

            if (errors.length > 0) {
                sendJson(response, 400, { message: "Validation failed", errors });
                return;
            }

            const created = {
                id: createId("I", instructors.length),
                name: payload.name.trim(),
                specialty: payload.specialty.trim(),
                yearsExperience: payload.yearsExperience,
                available: Boolean(payload.available)
            };

            instructors.push(created);
            sendJson(response, 201, created);
            return;
        }

        sendJson(response, 404, { message: "Endpoint not found" });
    } catch (error) {
        if (error instanceof SyntaxError) {
            sendJson(response, 400, { message: "Request body must be valid JSON" });
            return;
        }

        sendJson(response, 500, { message: "Unexpected server error" });
    }
});

server.listen(PORT, () => {
    console.log(`Mock API running at http://localhost:${PORT}`);
    console.log(`Try GET http://localhost:${PORT}/api/health`);
});
