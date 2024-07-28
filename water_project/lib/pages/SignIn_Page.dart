import 'package:flutter/material.dart';
import '../components/ui_helper.dart';
import 'Home_Page.dart';

class SignIn_Page extends StatefulWidget {
  @override
  State<SignIn_Page> createState() => _SignIn_PageState();
}

class _SignIn_PageState extends State<SignIn_Page> {
  TextEditingController phone = TextEditingController();

  Future<dynamic> error_dialog(String error_message) {
    return showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text(error_message),
            actions: [
              TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  child: const Text("OK"))
            ],
          );
        });
  }

  Future<void> signIn(String username) async {
  if (username.isEmpty) {
    error_dialog("Please ensure no fields are empty!");
  } else if (!isValidPhoneNumber(username)) {
    error_dialog("Please enter a valid 10-digit phone number!");
  } else {
    Navigator.pushReplacement(
        context, MaterialPageRoute(builder: (context) => HomePage()));
  }
}

bool isValidPhoneNumber(String number) {
  String digits = number.replaceAll(RegExp(r'\D'), '');
  return digits.length == 10;
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
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
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            children: [
              SizedBox(
                width: double.infinity,
                height: 200,
                child: Image.asset('assets/signin.jpg'),
              ),
              Padding(
                padding: const EdgeInsets.only(left: 25.0, bottom: 10),
                child: const Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Login',
                      style:
                          TextStyle(fontWeight: FontWeight.w700, fontSize: 25),
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(left: 25.0),
                child: const Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Phone Number',
                      style: TextStyle(fontWeight: FontWeight.w500),
                    ),
                  ],
                ),
              ),
              Uihelper.customtextfield(phone, '', Icons.phone, false),
              Uihelper.customButton('Login', () {
                signIn(phone.text);
              }),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Dont have an account?',
                    style: TextStyle(fontSize: 15),
                  ),
                  TextButton(
                      onPressed: () {},
                      child: Text(
                        'Sign Up',
                        style: TextStyle(color: Colors.blue),
                      ))
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
