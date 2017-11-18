/**
 * @author TristanVALCKE / https://github.com/Itee
 * @author moraxy / https://github.com/moraxy
 */
/* global QUnit */

import { RectAreaLight } from '../../../../src/lights/RectAreaLight';

export default QUnit.module( 'Lights', () => {

	QUnit.module.todo( 'RectAreaLight', ( hooks ) => {

		var lights = undefined;
		hooks.beforeEach( function () {

			const parameters = {
				color: 0xaaaaaa,
				intensity: 0.5,
				width: 100,
				height: 50
			};

			lights = [
				new RectAreaLight( parameters.color ),
				new RectAreaLight( parameters.color, parameters.intensity ),
				new RectAreaLight( parameters.color, parameters.intensity, parameters.width ),
				new RectAreaLight( parameters.color, parameters.intensity, parameters.width, parameters.height )
			];

		} );

		// INHERITANCE
		QUnit.test( "Extending", ( assert ) => {

			assert.ok( false, "everything's gonna be alright" );

		} );

		// INSTANCING
		QUnit.test( "Instancing", ( assert ) => {

			assert.ok( false, "everything's gonna be alright" );

		} );

		// PUBLIC STUFF
		QUnit.test( "isRectAreaLight", ( assert ) => {

			assert.ok( false, "everything's gonna be alright" );

		} );

		QUnit.test( "copy", ( assert ) => {

			assert.ok( false, "everything's gonna be alright" );

		} );

		QUnit.test( "toJSON", ( assert ) => {

			assert.ok( false, "everything's gonna be alright" );

		} );

		// OTHERS
		QUnit.test( 'Standard light tests', ( assert ) => {

			runStdLightTests( assert, lights );

		} );

	} );

} );
