export const jsonToObject = ( json ) => {
	let obj ;
	try { obj = JSON.parse( json ) }
	catch( error ) { return {} }
	return obj ;
}
export const deepClone = ( value ) => {
	return JSON.parse( JSON.stringify( value )) ;
}
