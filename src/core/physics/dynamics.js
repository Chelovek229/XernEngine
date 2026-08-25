function validatePhysicsObject(obj, name = "object") {
    if (!obj || typeof obj !== "object") {
        throw new TypeError(`${name} must be an object`);
    }

    if (!obj.velocity ||
        typeof obj.velocity.x !== "number" ||
        typeof obj.velocity.y !== "number") {
        throw new TypeError(
            `${name}.velocity must contain x and y numbers`
        );
    }

    if (
        !Number.isFinite(obj.velocity.x) ||
        !Number.isFinite(obj.velocity.y)
    ) {
        throw new RangeError(
            `${name}.velocity contains invalid numbers`
        );
    }
}


// Gravity
export function applyGravity(obj, gravity) {
    validatePhysicsObject(obj, "applyGravity obj");

    if (!Number.isFinite(gravity)) {
        throw new TypeError(
            "applyGravity: gravity must be a finite number"
        );
    }

    obj.velocity.y += gravity;
}


// Friction
export function applyFriction(obj, friction) {
    validatePhysicsObject(obj, "applyFriction obj");

    if (!Number.isFinite(friction)) {
        throw new TypeError(
            "applyFriction: friction must be a finite number"
        );
    }

    obj.velocity.x *= friction;
    obj.velocity.y *= friction;
}
