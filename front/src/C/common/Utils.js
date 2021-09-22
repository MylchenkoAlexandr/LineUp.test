export const getArraySize = ( array ) => {
	const row_count = array.length;
	const row_sizes = []
	for( let i = 0 ; i < row_count ; i++ ) row_sizes.push( array[ i ].length ) ;
	return {
		height: row_count,
		width: Math.min.apply( null, row_sizes )
	}
}
export const bufferToHex = ( buffer ) => Array.prototype.map.call( new Uint8Array( buffer ), x => ( '00' + x.toString(16) ).slice( -2 ) ).join('') ;
export const jsonToObject = ( json ) => {
	let obj ;
	try { obj = JSON.parse( json ) }
	catch( error ) { return {} }
	return obj ;
}
export const isJson = ( str ) => {
	let has = true ;
	try { JSON.parse( str ) }
	catch ( error ) { has = false }
	return has ;
}