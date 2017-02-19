export default {
  bips: {
    id: { type: 'string', maxlength: 24, nullable: false, primary: true },
    name: { type: 'string', maxlength: 255, nullable: false },
  },
	jobs: {
		id: { type: 'string', maxlength: 24, nullable: false, primary: true },
		name: { type: 'string', maxlength: 255, nullable: false },
	}
}
