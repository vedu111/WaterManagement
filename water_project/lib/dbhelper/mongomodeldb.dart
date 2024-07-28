import 'dart:developer';
import 'package:mongo_dart/mongo_dart.dart';
import 'constants.dart';

class MongoDB {
  static var db, user_Collection;
  static connect() async {
    db = await Db.create(Mongo_Url);
    await db.open();
    inspect(db);
    user_Collection = db.collection(User_Collection);
  }

  static Future insertData(Map<String, dynamic> data) async {
    try {
      await user_Collection.insertOne(data);
      print('Data inserted into MongoDB');
    } catch (e) {
      print('Error inserting data into MongoDB: $e');
    }
  }

  static Future<void> updatePDF(String phone, dynamic pdfFile) async {
  try {
    await user_Collection.updateOne(
      where.eq('phoneNumber', '+91$phone'), 
      modify.set('pdf_bytes', pdfFile),
    );
    print('PDF bytes updated in MongoDB');
  } catch (e) {
    print('Error updating PDF bytes in MongoDB: $e');
  }
}
}
