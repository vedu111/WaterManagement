import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:geolocator/geolocator.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../dbhelper/mongomodeldb.dart';

class ComplainPage1 extends StatefulWidget {
  const ComplainPage1({super.key});

  @override
  State createState() => _ComplainPage1State();
}

class _ComplainPage1State extends State<ComplainPage1> {
  File? file;
  String? _dropdownValue;
  String? _location;
  String? _address;
  final TextEditingController _complainDetailsController = TextEditingController();

  Future<void> image_pick(ImageSource source) async {
    try {
      final picker = ImagePicker();
      final pickedfile = await picker.pickImage(source: source);
      setState(() {
        if (pickedfile != null) {
          file = File(pickedfile.path);
        }
      });
    } catch (e) {
      print("Error picking image: $e");
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('फोटो चुनने में त्रुटि')),
      );
    }
  }

  Map<String, String> getCurrentDateTime() {
  DateTime now = DateTime.now();
  String date = now.toIso8601String().split('T').first; // Extract date part
  String time = now.toIso8601String().split('T').last.split('.').first; // Extract time part
  return {'Date': date, 'Time': time};
}


  Future<void> _getLocation() async {
    try {
      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          throw Exception('स्थान अनुमतियाँ अस्वीकृत हैं');
        }
      }
      
      Position position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high
      );

      final apiKey = 'AIzaSyCeo40A2OTwGex0a8rg1G6-gB3z7xWG1Uk'; // Replace with your actual API key
      final url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.latitude},${position.longitude}&key=$apiKey';

      final response = await http.get(Uri.parse(url));

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data['results'].isNotEmpty) {
          final address = data['results'][0]['formatted_address'];
          setState(() {
            _location = "${position.latitude}, ${position.longitude}";
            _address = address;
          });
        } else {
          throw Exception('कोई परिणाम नहीं मिला');
        }
      } else {
        throw Exception('पता लोड करने में विफल');
      }
    } catch (e) {
      print("Error getting location: $e");
      setState(() {
        _location = "स्थान प्राप्त करने में त्रुटि";
        _address = "पता प्राप्त करने में त्रुटि";
      });
    }
  }

Future<void> _submitComplaint() async {
  if (file == null || _dropdownValue == null || _complainDetailsController.text.isEmpty) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('कृपया सभी फ़ील्ड भरें और एक चित्र अपलोड करें')),
    );
    return;
  }
  Map<String, String> dateTime = getCurrentDateTime();
  Map<String, dynamic> complaintData = {
    'name' : 'Sachin Gupta',
    'Problem': _dropdownValue,
    'phoneNumber': '8291407855',
    'address': _address,
    'Location': _location,
    'ComplaintDetails': _complainDetailsController.text,
    'date': dateTime['Date'], 
    'Time': dateTime['Time'],
    'subRegion' : 'Indore',
    'category' : 'Leakage',
    'category_2' : 'shortage'
  };
  try {
    await MongoDB.insertData(complaintData);
    _showSuccessDialog();
    // Navigator.pop(context);
  } catch (e) {
    print('Error inserting data: $e');
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('डेटा सबमिट करने में समस्या आई')),
    );
  }

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('शिकायत सफलतापूर्वक दर्ज की गई')),
    );
  }


  //Success dialog to be shown when the data is succesfully inserted
  void _showSuccessDialog() {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.check_circle,
              color: Colors.green,
              size: 80,
            ),
            SizedBox(height: 20),
            Text(
              'शिकायत सफलतापूर्वक दर्ज की गई',
              style: TextStyle(fontSize: 18),
              textAlign: TextAlign.center,
            ),
          ],
        ),
        actions: [
          TextButton(
            child: Text('ठीक है'),
            onPressed: () {
              Navigator.of(context).pop();
              // Add any additional actions here, like navigating to a different screen
            },
          ),
        ],
      );
    },
  );
}

  @override
  void initState() {
    super.initState();
    _getLocation();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.white),
        automaticallyImplyLeading: true,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.only(
            bottomLeft: Radius.circular(20.0),
            bottomRight: Radius.circular(20.0),
          ),
        ),
        title: const Text(
          "शिकायतें दर्ज करे",
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        backgroundColor: const Color.fromARGB(255, 43, 95, 185),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Card(
                elevation: 4,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                child: GestureDetector(
                  onTap: () {
                    image_pick(ImageSource.camera);
                  },
                  child: Container(
                    height: 200,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(15),
                      color: Colors.grey[200],
                    ),
                    child: file == null
                        ? Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.camera_alt, size: 50, color: Colors.grey[600]),
                              const SizedBox(height: 10),
                              Text(
                                "फोटो अपलोड करें",
                                style: TextStyle(fontSize: 16.0, color: Colors.grey[600]),
                              ),
                            ],
                          )
                        : ClipRRect(
                            borderRadius: BorderRadius.circular(15),
                            child: Image.file(
                              file!,
                              fit: BoxFit.cover,
                              width: double.infinity,
                              height: 200,
                            ),
                          ),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              Card(
                elevation: 4,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: DropdownButtonFormField<String>(
                    value: _dropdownValue,
                    decoration: const InputDecoration(
                      labelText: 'श्रेणी चुनें',
                      border: InputBorder.none,
                    ),
                    onChanged: (String? newValue) {
                      setState(() {
                        _dropdownValue = newValue;
                      });
                    },
                    items: <String>['जल की कमी', 'रिसाव के']
                        .map<DropdownMenuItem<String>>((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(value),
                      );
                    }).toList(),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              Card(
                elevation: 4,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'पता:',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        _address ?? "पता प्राप्त कर रहे हैं...",
                        style: const TextStyle(fontSize: 14),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 20),
              Card(
                elevation: 4,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: TextField(
                    controller: _complainDetailsController,
                    maxLines: 4,
                    decoration: const InputDecoration(
                      labelText: 'शिकायत विवरण',
                      border: InputBorder.none,
                      hintText: 'अपनी शिकायत यहां दर्ज करें...',
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 30),
              ElevatedButton(
                onPressed: _submitComplaint,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Text(
                    'शिकायत दर्ज करें',
                    style: TextStyle(fontSize: 18, color: Colors.white),
                  ),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color.fromARGB(255, 43, 95, 185),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}