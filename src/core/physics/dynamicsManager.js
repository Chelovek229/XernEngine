export class DynamicsManager {
    constructor() {
        this.objects = [];
    }


    addObject(obj) {
        if (!obj || typeof obj !== "object") {
            throw new TypeError(
                "DynamicsManager: object must be an object"
            );
        }

        if (this.objects.includes(obj)) {
            throw new Error(
                "DynamicsManager: object already exists"
            );
        }

        this.objects.push(obj);
    }


    removeObject(obj) {
        const index = this.objects.indexOf(obj);

        if (index === -1) {
            throw new Error(
                "DynamicsManager: object not found"
            );
        }

        this.objects.splice(index, 1);
    }


    applyAllForces(deltaTime) {
        for (const obj of this.objects) {

            if (!obj.velocity ||
                typeof obj.velocity.x !== "number" ||
                typeof obj.velocity.y !== "number") {

                throw new TypeError(
                    "DynamicsManager: object has invalid velocity"
                );
            }


            // пример физики
            if (obj.gravity) {
                obj.velocity.y += obj.gravity * deltaTime;
            }


            obj.x += obj.velocity.x * deltaTime;
            obj.y += obj.velocity.y * deltaTime;
        }
    }
}
