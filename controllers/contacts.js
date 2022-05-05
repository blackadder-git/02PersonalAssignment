const mongodb = require( '../db/connect' );
const ObjectId = require( 'mongodb' ).ObjectId;

// GET
const getAll = async ( req, res, next ) => {
    console.log( "Debug: getAll" );

    const result = await mongodb.getDb().db().collection( 'contacts' ).find();
    console.log( result );
    result.toArray().then(( lists ) => {
        res.setHeader( 'Content-Type', 'application/json' );
        res.status( 200 ).json( lists) ;
    });
};

// GET
const getSingle = async ( req, res, next ) => {
    console.log( "Debug: getSingle" );
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db()
        .collection( 'contacts' )
        .find({ _id: userId });
    result.toArray().then(( lists ) => {
        res.setHeader( 'Content-Type', 'application/json' );
        res.status( 200 ).json( lists[0] );
    });
};

// POST
const createContact = async ( req, res, next ) => {
    console.log( "Debug: createContact" );
    console.log( req.body ); // made possible thanks to body-parser

    // make sure values exist
    if (req.body.firstName.length > 0 &&
        req.body.lastName.length > 0 &&
        req.body.email.length > 0 &&
        req.body.favoriteColor.length > 0 &&
        req.body.birthday.length > 0
        ) {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        console.log( contact );

        try {
            const response = await mongodb.getDb().db().collection( 'contacts' ).insertOne( contact );
            if ( response.acknowledged ) {
                res.setHeader( 'Content-Type', 'application/json' );
                res.status( 201 ).json( response );
                /*
                response contains 
                {
                    "acknowledged": true,
                    "insertedId": "6272947069c09b0855edbb4e"
                }      
                */
            }
            else {
                res.status( 500 ).json( response.error || 'Some error occurred while creating the contact.' );
            }
        }
        catch ( err ) {
            console.log( err );
            res.status( 500 ).json( response.error || 'Some error occurred while creating the contact.' );
        }
    }
    else {
        res.status( 500 ).json( "error: missing data" );
    }
};

// PUT
const updateContact = async ( req, res, next ) => {
    console.log( "Debug: updateContact" );
    
    const userId = req.params.id;
    console.log("Update:", userId);
    
    //res.send( "update" );
    //return res.status(201).json( contact );

    console.log( req.body ); // made possible thanks to body-parser

    // make sure values exist
    if (req.body.firstName.length > 0 &&
        req.body.lastName.length > 0 &&
        req.body.email.length > 0 &&
        req.body.favoriteColor.length > 0 &&
        req.body.birthday.length > 0
        ) {

        const update = { $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        }};

        console.log( update );

        try {
            const response = await mongodb.getDb().db().collection( 'contacts' ).updateOne( { _id: ObjectId(userId) }, update );
            if ( response.acknowledged ) {
                res.setHeader( 'Content-Type', 'application/json' );
                res.status( 201 ).json( response );
                /*
                response contains 
                {
                    "acknowledged": true,
                    "insertedId": "6272947069c09b0855edbb4e"
                }      
                */
            }
            else {
                res.status( 500 ).json( response.error || 'Some error occurred while creating the contact.' );
            }
        }
        catch ( err ) {
            console.log( err );
            res.status( 500 ).json(err.error || 'Some error occurred while creating the contact.' );
        }
    }
    else {
        res.status( 500 ).json( "error: missing data" );
    }
};

// DELETE
const deleteContact = async ( req, res, next ) => {
    console.log( "Debug: deleteContact" );

    const userId = req.params.id;
    console.log("Delete:", userId);

    if (userId.length > 0) {

        // delete contact (wrap userId up as an Object)
        try {
            const response = await mongodb.getDb().db().collection( 'contacts' ).deleteOne({ _id: ObjectId(userId) });
            if ( response.acknowledged ) {
                res.setHeader( 'Content-Type', 'application/json' );
                res.status( 201 ).json( response );
            }
            else {
                res.status( 500 ).json( response.error || 'Some error occurred while creating the contact.' );
            }
        }
        catch ( err ) {
            console.log( err );
            res.status( 500 ).json( response.error || 'Some error occurred while creating the contact.' );
        }
    }
    else {
        res.status( 500 ).json( "error: missing data" );
    }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };