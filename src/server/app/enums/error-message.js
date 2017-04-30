const NO_DATA_IN_TABLE = 'There is no data in the table.';
const NO_DATABASE = 'There is no database.';

class ErrorMessage {
    static get NO_DATA_IN_TABLE() { return NO_DATA_IN_TABLE; }
    static get NO_DATABASE() { return NO_DATABASE; }
}

module.exports = ErrorMessage;
