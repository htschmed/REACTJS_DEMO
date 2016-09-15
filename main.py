import tornado.ioloop
import tornado.web
import config
import sys

def make_app():
    return tornado.web.Application(config.routes, **config.settings)

if __name__ == "__main__":
    print('\n\nTo view the demo open a web browser and navigate to:\n\nhttp://localhost:7777/\n\n')
    sys.stdout.flush()
    app = make_app()
    app.listen(7777, address='127.0.0.1')
    tornado.ioloop.IOLoop.current().start()
