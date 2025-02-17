import * as Utils from '../lib/utils';

/**
 * @class 
  Assets  
* @summary Creates an instance of `Assets`.
* @description Retrieves all assets of a stack by default. To retrieve a single asset, specify its UID.
* @param {String} uid - uid of asset you want to retrieve
* @example 
* let data = Stack.Assets('asset_uid').toJSON().fetch()
*      data
*      .then(function(result) {
*           // ‘result’ is a single asset object of specified uid       
*      }, function(error) {
*           // error function
*      })
* @example 
* // Retrieves all assets*
* let data = Stack.Assets().Query().toJSON().find()
*      data
*      .then(function(result) {
*          // All the asset with limit of 100
*          // Use skip and limit functions to paginate
*          // ‘result’ will display all assets present in stack       
*      }, function(error) {
*           // error function
*      })
* @returns {Assets}
* @instance
*/

export default class Assets {
    constructor() {
        this._query = {};        
        this.only = Utils.transform('only');
        return this;
    }

 /**
   * Converts your response into plain JavasScript object
   * @memberOf Assets
   * @example var Query = Stack.ContentType('blog').Query()
    Query   
         .toJSON()
         .find()
         .then(function (result) {
             // 'result' is an object which content the data in json object form
          },function (error) {
             // error function
     })
   * @returns {Assets}
   * @instance
   */
  
    toJSON() {
        this.tojson = true;
        return this;
    }

/**
   * Includes query parameters in your queries.
   * @memberOf Assets
   * @example var data = Stack.Assets(assetUid).addParam('include_dimension', 'true').toJSON().fetch()
     *      data.then(function (result) {
     *          // 'result' is an object which content the data including count in json object form
     *       },function (error) {
     *          // error function
     *      })
     * @returns {Assets}
     * @instance
   */
  
    addParam(key, value) {
        if (key && typeof key === 'string' && value && typeof value === 'string') {        
            this._query[key] = value;
            return this;
        } else {
            console.error("Kindly provide a valid parameters.");
        }
    }

    /**
     * @method includeFallback
     * @memberOf Entry
     * @description Include the fallback locale publish content, if specified locale content is not publish.
     * @example stack.ContentType(contentType_uid).Entry(entry_uid).includeFallback().fetch()
     * @returns {Asset}
     * @instance
     */
    includeFallback() {
        this._query['include_fallback'] = true;
        return this;
    }

/**
   * Fetches a particular asset based on the provided asset UID.
   * @memberOf Assets
   * @example
   * Stack.Assets('assets_uid').toJSON().fetch()
   * @example
   * Stack.Assets('assets_uid').toJSON().fetch({
   *         
   *      })
   * @returns {promise}
   * @instance
   */

    fetch(fetchOptions) {
        if (this.asset_uid) {
            this.requestParams = {
                method: 'POST',
                headers: this.headers,
                url: this.config.protocol + "://" + this.config.host + ':' + this.config.port + '/' + this.config.version + this.config.urls.assets + this.asset_uid,
                body: {
                    _method: 'GET',
                    query: this._query
                }
            }
            var options = Utils.mergeDeep(this.fetchOptions, fetchOptions);
            return Utils.sendRequest(this, options);
        } else {
            console.error("Kindly provide an asset uid. e.g. .Assets('asset_uid')");
        }
    }
}