import Vue from 'vue'
export default class Errors {
    /**
     * Create a new Errors instance.
     */
    constructor() {
        this.errors = {};
    }


    /**
     * Determine if an errors exists for the given field.
     *
     * @param {string} field
     */
    has(field) {
        return this.errors.hasOwnProperty(field);
    }


    /**
     * Determine if we have any errors.
     */
    any() {
        return Object.keys(this.errors).length > 0;
    }


    /**
     * Retrieve the error message for a field.
     *
     * @param {string} field
     */
    get(field) {
        if (this.errors[field]) {
            return [this.errors[field].detail];
        }
    }


    /**
     * Record the new errors.
     *
     * @param {object} errors
     */
    record(newErrors) {
      Vue.set(this,'errors', newErrors)
    }


    /**
     * Clear one or all error fields.
     *
     * @param {string|null} field
     */
    clear(field) {
        if (field) {
            Vue.delete(this.errors, field)
        }else{
            Vue.set(this, 'errors', {})
        }
    }
}
