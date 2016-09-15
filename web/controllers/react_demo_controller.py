from tornado.web import RequestHandler
import json

class ReactTutorialHandler(RequestHandler):
    def get(self):
        self.render('react_demo.html')

class ReactTutorialAPIHandler(RequestHandler):
    def get(self):
        self.set_header("Content-Type", "application/json")
        json_text = open('comments.json').read()
        self.finish(json_text)

    def post(self):
        author = self.get_argument('author')
        text = self.get_argument('text')
        key = self.get_argument('id')
        data = None
        with open('comments.json', 'r') as json_data:
            data = json.load(json_data)
            
        data.append({"author": author, "text": text, "id": key})
        with open('comments.json', 'w') as json_data:
            json.dump(data, json_data, indent=4)

        self.set_header("Content-Type", "application/json")
        self.finish(json.dumps(data));
