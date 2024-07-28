import 'package:flutter/material.dart';
import '../components/service_cards.dart';
import 'Jal_Prabhandan.dart';

class HomePage extends StatelessWidget{
  const HomePage({super.key});

  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.only(
            bottomLeft: Radius.circular(20.0),
            bottomRight: Radius.circular(20.0),
          ),
        ),
        title: const Text(
          "311",
          style: TextStyle(color: Colors.white),
        ),
        centerTitle: true,
        backgroundColor: Color.fromARGB(255, 43, 95, 185),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: GestureDetector(
              onTap: () {
                Navigator.push(context,MaterialPageRoute(builder: (context)=> JalPrabandhan()));
              },
              child: ServiceCard(
                icon: Icons.water_drop,
                title: 'जल प्रबंधन', 
              ),
            ),
          )
        ],

      ),
    );
  }
}