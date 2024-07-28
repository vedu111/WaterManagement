import 'package:flutter/material.dart';

class Uihelper {
  static customtextfield(TextEditingController controller, String name,
      IconData icon, bool value) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 5.0),
      child: SizedBox(
        height: 45,
        child: TextField(
          controller: controller,
          obscureText: value,
          keyboardType: TextInputType.number,
          decoration: InputDecoration(
            filled: true,
              fillColor: Color.fromARGB(255, 193, 193, 193),
              prefixIcon: Icon(icon),
              hintText: name,
              border: const OutlineInputBorder(
                borderSide: BorderSide.none,
                  borderRadius: BorderRadius.all(Radius.circular(30.0)))),
        ),
      ),
    );
  }

  static customButton(String buttonName, VoidCallback onpressfunction) {
    return Padding(
      padding: const EdgeInsets.only(top: 18.0),
      child: SizedBox(
          height: 50,
          width: 300,
          child: ElevatedButton(
            onPressed: onpressfunction,
            style: ElevatedButton.styleFrom(
              elevation: 2,
              backgroundColor: Color.fromARGB(255, 42, 88, 167),
            ),
            child: Text(
              buttonName,
              style: const TextStyle(color: Colors.white, fontSize: 16),
            ),
          )),
    );
  }

  static jalServices(String name,VoidCallback onpressfunction,IconData icon,BuildContext context){
    return GestureDetector(
      onTap: onpressfunction,
      child: Container(
        width: MediaQuery.of(context).size.width,
        margin: EdgeInsets.all(10.0),
        padding: EdgeInsets.all(5.0),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16.0),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.5),
              spreadRadius: 2,
              blurRadius: 5,
              offset: Offset(0, 3),
            ),
          ],
        ),
        child: Row(
          children: [
            CircleAvatar(
              backgroundColor: Colors.blue,
              radius: 20.0,
              child: Icon(
                icon,
                color: Colors.white,
                size: 20.0,
              ),
            ),
            SizedBox(width: 16.0),
            Text(
              name,
              style: TextStyle(
                fontSize: 18.0,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }

//   static void showAlertBox(
//     BuildContext context,
//     Future<void> Function(ImageSource source) imagePickCallback,
//   ) {
//     showDialog(
//       context: context,
//       builder: (BuildContext context) {
//         return AlertDialog(
//           title: Text('Select the image from'),
//           content: Column(
//             mainAxisSize: MainAxisSize.min,
//             children: [
//               ListTile(
//                 onTap: ()async{
//                   await imagePickCallback(ImageSource.camera);
//                   Navigator.pop(context);
//                 }, 
//                 leading: Icon(Icons.camera),
//                 title: Text('Camera'),
//               ),
//               ListTile(
//                 onTap: ()async{
//                   await imagePickCallback(ImageSource.gallery);
//                   Navigator.pop(context);
//                 }, 
//                 leading: Icon(Icons.photo),
//                 title: Text('Gallery'),
//               )
//             ],
//           ),
//         );
//       },
//     );
//   }

// }
}