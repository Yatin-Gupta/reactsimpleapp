Previously Type checking was internal of react but from 2015 it comes as external package.

To set default property of Component class we can set as:

ListGroup.defaultProps = {
	textProperty: 'name',
	valueProperty: '_id'
};

so no matter if parent component provide value for textProperty and valueProperty or not, it will be set by default.