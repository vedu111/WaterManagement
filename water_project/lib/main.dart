import 'package:flutter/material.dart';
import 'dbhelper/mongomodeldb.dart';
import 'pages/SignIn_Page.dart';
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const Main());
  await MongoDB.connect();
}

class Main extends StatelessWidget{
  const Main({super.key});
  @override
  Widget build(BuildContext context){
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: SignIn_Page(),
    );
  }
}