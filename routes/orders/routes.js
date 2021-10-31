const HTMLParser = require('node-html-parser');
var Workbook = require('xlsx-workbook').Workbook;
 
var workbook = new Workbook();
var orderSummarySheet = workbook.add('Order Summary');

async function routes(fastify, options) {
    fastify.post('/save_from_automail_to_drive', function(request, reply) {
        // const mailHTMLRoot = HTMLParser.parse(request.body.mailHTML);

		// const orderDataEl = mailHTMLRoot.querySelector('.order_data');
		// const orderID = orderDataEl.querySelector('.order_id').innerText;
		// const sellerName = orderDataEl.querySelector('.seller_name').innerText;

		// const productRows = mailHTMLRoot.querySelectorAll('.product-data-row');

		// const wb = XLSX.utils.book_new();

		// for (let productRow of productRows) {
		// 	const productData = productRow.querySelector('.product_data');
		// 	const barcode = productData.querySelector('.product_barcode').innerText;
		// 	const quantity = Number(productData.querySelector('.product_quantity').innerText);
		// 	const tag = productData.querySelector('.product_tag').innerText;

		// 	let pieceCount = 0;

		// 	if (tag) {
		// 		const piecesInVariant = tag.split(',')[0];
		// 		pieceCount = piecesInVariant * quantity;
		// 	}
		// }

		orderSummarySheet[0][0] = 'OID12';
		orderSummarySheet[0][1] = 'Blu Energy Drink';
		orderSummarySheet[1][0] = 'OID12';
		orderSummarySheet[1][1] = 'Cool Prod';
      workbook.save('test');

        reply.send({});
    });
}

module.exports = routes;
