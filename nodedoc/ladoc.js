/**
* Linear algebra module.
* @module la
* @example
* // import module, create a random matrix and a vector, multiply. find svd of the matrix
*/
/**
* Matrix constructor parameter object
* @typedef {Object} matrixArg
* @property  {number} matrixArg.rows - Number of rows.
* @property  {number} matrixArg.cols - Number of columns.
* @property  {boolean} [matrixArg.random=false] - Generate a random matrix with entries sampled from a uniform [0,1] distribution. If set to false, a zero matrix is created.
*/
/**
* Matrix
* @classdesc Represents a dense matrix (2d array)
* @class
* @param {(module:la~matrixArg | Array<Array<number>> | module:la.Matrix)} [arg] - Constructor arguments. There are three ways of constructing.
* <br>1. Parameter object module:la~matrixArg. 
* <br>2. Nested array of matrix elements (row major). Example: [[1,2],[3,4]] has two rows, the first row is [1,2].
* <br>3. A matrix (copy constructor)
* @example
* // TODO
*/
 exports.Matrix = function(arg) {}	
/**
	* Returns an element of matrix
	* @param {number} rowIdx - row index (zero based)
	* @param {number} colIdx - column index (zero based)
	* @returns {number} Matrix element
	*/
 exports.Matrix.prototype.at = function(rowIdx, colIdx) {}
/**
	* Sets an element of matrix
	* @param {number} rowIdx - row index (zero based)
	* @param {number} colIdx - column index (zero based)
	* @param {number} num - input value
	* @returns {module:la.Matrix} Self
	*/
 exports.Matrix.prototype.put = function(rowIdx, colIdx, num) {}
/**
	* Right-hand side multiplication of matrix with parameter
	* @param {(number | module:la.Vector | module:la.SparseVector | module:la.Matrix | module:la.SparseMatrix)} arg - Multiplication input. Supports scalar, vector and matrix input.
	* @returns {(module:la.Matrix | module:la.Vector)} Output - If arg is
	* <br>1. number, {@link module:la.Matrix} or {@link module:la.SparseMatrix}: Output is {@link module:la.Matrix}.
	* <br>2. {@link module:la.Vector} or {@link module:la.SparseVector}: Output is {@link module:la.Vector}.
	*/
 exports.Matrix.prototype.multiply = function(arg) {}
/**
	* Matrix transpose and right-hand side multiplication of matrix with parameter
	* @param {(number | module:la.Vector | module:la.SparseVector | module:la.Matrix | module:la.SparseMatrix)} arg - Multiplication input. Supports scalar, vector and matrix input.
	* @returns {(module:la.Matrix | module:la.Vector)} Output - If arg is
	* <br>1. number, {@link module:la.Matrix} or {@link module:la.SparseMatrix}: Output is {@link module:la.Matrix}.
	* <br>2. {@link module:la.Vector} or {@link module:la.SparseVector}: Output is {@link module:la.Vector}.
	*/
 exports.Matrix.prototype.multiplyT = function(arg) {}
/**
	* Addition of two matrices
	* @param {module:la.Matrix} mat2 - Second matrix.
	* @returns {module:la.Matrix} mat3 - sum of matrices
	*/
 exports.Matrix.prototype.plus = function(mat2) {}
/**
	* Substraction of two matrices
	* @param {module:la.Matrix} mat2 - Second matrix
	* @returns {module:la.Matrix} mat3 - difference of matrices
	*/
 exports.Matrix.prototype.minus = function(mat2) {}
/**
	* Transposes matrix
	* @returns {module:la.Matrix} mat2 - transposed matrix
	*/
 exports.Matrix.prototype.transpose = function() {}
/**
	* Solves the linear system
	* @param {module:la.Vector} vec - the right-hand side of the equation
	* @returns {module:la.Vector} vec2 - solution of the linear system
	*/
 exports.Matrix.prototype.solve = function (vec) {}
/**
	* Returns a vector of row norms
	* @returns {module:la.Vector} vec - dense vector, where vec[i] is the norm of the i-th row of matrix
	*/
 exports.Matrix.prototype.rowNorms = function () {}
/**
	* Returns a vector of column norms
	* @returns {module:la.Vector} vec - dense vector, where vec[i] is the norm of the i-th column of matrix
	*/
 exports.Matrix.prototype.colNorms = function () {}
/**
	* Normalizes each column of matrix
	* @returns {module:la.Matrix} Self
	*/
 exports.Matrix.prototype.normalizeCols = function () {}
/**
	* Transforms the matrix from dense to sparse format
	* @returns {module:la.SparseMatrix} spMat - sparse column matrix representation of dense matrix
	*/
 exports.Matrix.prototype.sparse = function () {}
/**
	* Returns the frobenious norm of matrix
	* @returns {number} num - Frobenious norm of matrix.
	*/
 exports.Matrix.prototype.frob = function () {}
/**
	* Returns the number of rows of matrix
	* @returns {number} rows
	*/
 exports.Matrix.prototype.rows = undefined
/**
	* Returns the number of columns of matrix
	* @returns {number} cols
	*/
 exports.Matrix.prototype.cols = undefined
/**
	* Index of maximum element in given row
	* @param {number} rowIdx - row index (zero based)
	* @returns {number} colId - column index (zero based)
	*/
 exports.Matrix.prototype.rowMaxIdx = function (rowIdx) {}
/**
	* Index of maximum element in given column
	* @param {number} colIdx - column index (zero based)
	* @returns {number} rowIdx - row index (zero based)
	*/
 exports.Matrix.prototype.colMaxIdx = function (colIdx) {}
/**
	* Returns the corresponding column of matrix as vector
	* @param {number} colIdx - column index (zero based)
	* @returns {module:la.Vector} vec - the colIdx-th column of matrix
	*/
 exports.Matrix.prototype.getCol = function (colIdx) {}
/**
	* Sets the column of matrix
	* @param {number} colIdx - column index (zero based)
	* @param {module:la.Vector} vec - the new column of matrix
	* @returns {module:la.Matrix} Self
	*/
 exports.Matrix.prototype.setCol = function (colIdx, vec) {}
/**
	* Returns the corresponding row of matrix as vector
	* @param {number} rowIdx - row index (zero based)
	* @returns {module:la.Vector} vec - the rowIdx-th row of matrix
	*/
 exports.Matrix.prototype.getRow = function (rowIdx) {}
/**
	* Sets the row of matrix
	* @param {number} rowIdx - row index (zero based)
	* @param {module:la.Vector} vec - the new row of matrix
	* @returns {module:la.Matrix} Self
	*/
 exports.Matrix.prototype.setRow = function (rowIdx, vec) {}
/**
	* Returns the diagonal elements of matrix
	* @returns {module:la.Vector} vec - vector containing the diagonal elements
	*/
 exports.Matrix.prototype.diag = function () {}
/**
	* saves the matrix as output stream
	* @param {module:fs.FOut} fout - Output stream.
	* @returns {module:fs.FOut} fout
	*/
 exports.Matrix.prototype.save = function (fout) {}
/**
	* loads the matrix from input stream
	* @param {module:fs.FIn} fin - Input stream.
	* @returns {module:la.Matrix} Self.
	*/
 exports.Matrix.prototype.load = function (FIn) {}
/**
* Sparse Vector
* @classdesc Represents a sparse vector
* @class
* @param {(Array<Array<number>> | module:la.SparseVector)} [arg] - Constructor arguments. There are two ways of constructing.
* <br>1. Nested array of vector elements. Example: [[0,2],[2,3]] has two nonzero values, first value is 2 at position 0, second value is 3 at position 2.
* <br>2. A sparse vector (copy constructor)
* @example
* // TODO
*/
 exports.SparseVector = function(arg) {}	
/**
	* Returns an element of sparse vector
	* @param {number} idx - index (zero based)
	* @returns {number} Sparse vector element
	*/
 exports.SparseVector.prototype.at = function (idx) {}
/**
	* Puts a new element in sparse vector
	* @param {number} idx - index (zero based)
	* @param {number} num - input value
	* @returns {module:la.SparseVector} Self
	*/
 exports.SparseVector.prototype.put = function (idx, num) {}
/**
	* Returns the sum of all values in sparse vector
	* @returns {number} num - The sum of all values in sparse vector.
	*/
 exports.SparseVector.prototype.sum = function () {}
/**
	* Returns the inner product of argument and sparse vector
	* @param {(module:la.Vector | module:la.SparseVector)} arg - Inner product input. Supports dense vector and sparse vector.
	* @returns {number} num - The inner product.
	*/
 exports.SparseVector.prototype.inner = function (arg) {}
/**
	* Multiplies sparse vector with number
	* @param {number} num - Number for multiplication.
	* @returns {module:la.SparseVector} spVec - Product of num and sparse vector.
	*/
 exports.SparseVector.prototype.multiply = function (num) {}
/**
	* Normalizes the sparse vector
	* @returns {module:la.SparseVector} Self - normalized
	*/
 exports.SparseVector.prototype.normalize = function () {}
/**
	* Returns the number of nonzero values
	* @returns {number} num - number of nonzero values
	*/
 exports.SparseVector.prototype.nnz = undefined
/**
	* Returns the dimension of sparse vector
	* @returns {number} num - dimension of sparse vector
	*/
 exports.SparseVector.prototype.dim = undefined
/**
	* Returns the norm of sparse vector
	* @returns {number} num - norm of sparse vector
	*/
 exports.SparseVector.prototype.norm = function () {}
/**
	* Returns the dense vector representation of sparse vector
	* @returns {module:la.Vector} vec - dense vector representation
	*/
 exports.SparseVector.prototype.full = function () {}
/**
	* Returns a dense vector of values of nonzero elements of sparse vector
	* @returns {module:la.Vector} vec - dense vector of values
	*/
 exports.SparseVector.prototype.valVec = function () {}
/**
	* Returns a dense vector of indices (zero based) of nonzero elements of sparse vector
	* @returns {module:la.Vector} vec - dense vector of indeces
	*/
 exports.SparseVector.prototype.idxVec = function () {}
/**
	* Returns the sparse vector as string
	* @returns {string} str - sparse vector as string
	*/
 exports.SparseVector.prototype.print = function () {}
/**
* Sparse Matrix
* @classdesc Represents a sparse matrix
* @class
* @param {(Array<Array<Array<number>>> | module:la.SparseMatrix)} [arg] - Constructor arguments. There are two ways of constructing.
* <br>1. Nested arrays of matrix elements. Example: [[[0,2]], [[0, 1], [2,3]]] has 2 columns. The second nonzero element in second column has a value 3 at index 2.
* <br>2. A sparse matrix (copy constructor).
* @example
* // TODO
*/
 exports.SparseMatrix = function(arg) {}	
/**
	* Returns an element of sparse matrix
	* @param {number} rowIdx - row index (zero based)
	* @param {number} colIdx - column index (zero based)
	* @returns {number} val - matrix value
	*/
 exports.SparseMatrix.prototype.at = function (rowIdx, colIdx) {}
/**
	* Puts an element in sparse matrix
	* @param {number} rowIdx - row index (zero based)
	* @param {number} colIdx - column index (zero based)
	* @param {number} num - element value
	* @returns {module:la.SparseMatrix} Self
	*/
 exports.SparseMatrix.prototype.put = function (rowIdx, colIdx, num) {}
/**
	* Returns the column of sparse matrix
	* @param {number} colIdx - column index (zero based)
	* @returns {module:la.SparseVector} spVec - sparse vector corresponding to the colIdx-th column of sparse matrix
	*/
 exports.SparseMatrix.prototype.getCol = function (colIdx) {}
/**
	* Sets a column in sparse matrix
	* @param {number} colIdx - column index (zero based)
	* @param {module:la.SparseVector} spVec - new column sparse vector
	* @returns {module:la.SparseMatrix} Self
	*/
 exports.SparseMatrix.prototype.setCol = function (colIdx, spVec) {}
/**
	* Attaches a column to sparse matrix
	* @param {module:la.SparseVector} spVec - attached column as sparse vector
	* @returns {module:la.SparseMatrix} Self
 	*/
 exports.SparseMatrix.prototype.push = function (spVec) {}
/**
	* Multiplies argument with sparse vector
	* @param {(number | module:la.Vector | module:la.SparseVector | module:la.Matrix | module:la.SparseMatrix)} arg - Multiplication input. Supports scalar, vector and matrix input.
	* @returns {(module:la.Vector | module:la.Matrix)} Output - If arg is
	* <br>1. number, {@link module:la.Matrix} or {@link module:la.SparseMatrix}: Output is {@link module:la.Matrix}.
	* <br>2. {@link module:la.Vector} or {@link module:la.SparseVector}: Output is {@link module:la.Vector}.
	*/
 exports.SparseMatrix.prototype.multiply = function (arg) {}
/**
	* Sparse matrix transpose and multiplies with argument
	* @param {(number | module:la.Vector | module:la.SparseVector | module:la.Matrix | module:la.SparseMatrix)} arg - Multiplication input. Supports scalar, vector and matrix input.
	* @returns {(module:la.Vector | module:la.Matrix)} Output - If arg is
	* <br>1. number, {@link module:la.Matrix} or {@link module:la.SparseMatrix}: Output is {@link module:la.Matrix}.
	* <br>2. {@link module:la.Vector} or {@link module:la.SparseVector}: Output is {@link module:la.Vector}.
	*/
 exports.SparseMatrix.prototype.multiplyT = function (arg) {}
/**
	* Returns the sum of two matrices
	* @param {module:la.SparseMatrix} spMat - sparse matrix
	* @returns {module:la.SparseMatrix} spMat2 - sum of two sparse matrices
	*/
 exports.SparseMatrix.prototype.plus = function (spMat) {}
/**
	* Returns the difference of two matrices
	* @param {module:la.SparseMatrix} spMat - sparse matrix
	* @returns {module:la.SparseMatrix} spMat2 - the difference of two sparse matrices
	*/
 exports.SparseMatrix.prototype.minus = function (spMat) {}
/**
	* Returns the transposed sparse matrix
	* @returns{module:la.SparseMatrix} spMat - transposed sparse matrix
	*/
 exports.SparseMatrix.prototype.transpose = function () {}
/**
	* Returns the vector of column norms of sparse matrix
	* @returns {module:la.Vector} vec - Vector of column norms. vec[i] is the norm of i-th column of sparse matrix
	*/
 exports.SparseMatrix.prototype.colNorms = function () {}
/**
	* Normalizes columns of sparse matrix
	* @returns {module:la.SparseMatrix} Self - normalized columns
	*/
 exports.SparseMatrix.prototype.normalizeCols = function () {}
/**
	* Returns the dense representation of sparse matrix
	* @returns {module:la.Matrix} mat - dense representation of sparse matrix
	*/
 exports.SparseMatrix.prototype.full = function () {}
/**
	* Returns the frobenious norm of sparse matrix
	* @returns {number} num - frobenious norm of sparse matrix
	*/
 exports.SparseMatrix.prototype.frob = function () {}
/**
	* Returns the number of rows of sparse matrix
	* @returns {number} num - number of rows
	*/
 exports.SparseMatrix.prototype.rows = undefined
/**
	* Returns the number of columns of sparse matrix
	* @returns {number} num - number of columns
	*/
 exports.SparseMatrix.prototype.cols = undefined
/**
	* Returns the sparse matrix as string
	* @returns {string} str - Sparse matrix as string. The first column represents row indeces, second column represents column indeces, third column represents value.
	*/
 exports.SparseMatrix.prototype.print = function () {}
/**
	* saves the sparse matrix as output stream
	* @param {module:fs.FOut} fout - Output stream.
	* @returns {module:fs.FOut} fout
	*/
 exports.SparseMatrix.prototype.save = function (fout) {}
/**
	* loads the sparse matrix from input stream
	* @param {module:fs.FIn} fin - Input stream.
	* @returns {module:la.Matrix} Self.
	*/
 exports.SparseMatrix.prototype.load = function (FIn) {}
