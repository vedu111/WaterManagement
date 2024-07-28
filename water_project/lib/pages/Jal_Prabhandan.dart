import 'package:flutter/material.dart';
import '../components/ui_helper.dart';
import 'complaint_page.dart';

class JalPrabandhan extends StatelessWidget{
  const JalPrabandhan({super.key});

  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        automaticallyImplyLeading: true,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.only(
            bottomLeft: Radius.circular(20.0),
            bottomRight: Radius.circular(20.0),
          ),
        ),
        title: const Text(
          "जल प्रबंधन",
          style: TextStyle(color: Colors.white),
        ),
        centerTitle: true,
        backgroundColor: const Color.fromARGB(255, 43, 95, 185),
      ),
      body: Column(
        children: [
          Uihelper.jalServices('शिकायतें दर्ज करे', () { 
            Navigator.push(context, MaterialPageRoute(builder: (context)=> ComplainPage1()));
          }, Icons.feedback, context),
          Uihelper.jalServices('सभी शिकायतें देखें', () { }, Icons.list, context)
        ],
      ),
    );
  }
}