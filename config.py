from web.controllers.react_demo_controller import *
import tornado.web
import os

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.redirect('/react_demo')

routes = [(r"/", MainHandler),
          (r"/react_demo", ReactTutorialHandler),
          (r"/react_demo/api/comments", ReactTutorialAPIHandler),
        ]

settings = {
    'static_path': os.path.join(os.path.dirname(__file__), 'web/static'),
    'template_path': os.path.join(os.path.dirname(__file__), 'web/templates'),
    'xsrf_cookies': False,
}
