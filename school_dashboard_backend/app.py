from cli.main import main_menu
from db.init_db import init_db

if __name__ == "__main__":
    init_db()
    main_menu()
