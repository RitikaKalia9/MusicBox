from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample GIF data, organized by theme
gif_data = {
    "nature": [
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmJrcHEyZjB4dzNoOG1mNndocWNiNDY5dmp2ZWpyaWdma3prbXZndyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/RoFXqXWN639Qs/giphy.webp",
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmJrcHEyZjB4dzNoOG1mNndocWNiNDY5dmp2ZWpyaWdma3prbXZndyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUA7aPhCAs5QRvMMJa/200.webp",
        "https://media4.giphy.com/media/dU97uV3UyP0ly/200.webp?cid=790b7611bbkpq2f0xw3h8mf6whqcb469vjvejrigfkzkmvgw&ep=v1_gifs_search&rid=200.webp&ct=g"
    ],
    "party": [
        "https://media1.giphy.com/media/3KC2jD2QcBOSc/200.webp?cid=790b7611med7vcuqgfuf3ly3zxfsz6smypo49st7omtcwtky&ep=v1_gifs_search&rid=200.webp&ct=g",
        "https://media2.giphy.com/media/kyLYXonQYYfwYDIeZl/giphy.webp?cid=790b7611wzb8lmcbmci6z6ob0wq8gxvb8049jwjuh4qgod8o&ep=v1_gifs_search&rid=giphy.webp&ct=g",
        "https://media1.giphy.com/media/5xaOcLGvzHxDKjufnLW/giphy.webp?cid=790b7611wzb8lmcbmci6z6ob0wq8gxvb8049jwjuh4qgod8o&ep=v1_gifs_search&rid=giphy.webp&ct=g"
    ],
    "excited": [
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXp6emtnank2Y2JyMGhzdjR0emg1cmUxMGF5NnAzdTNsZjB0MHczNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/oF5oUYTOhvFnO/200.webp",
        "https://media2.giphy.com/media/D2hncA3u88gmeCFeoh/giphy.webp?cid=790b7611qzzzkgjy6cbr0hsv4tzh5re10ay6p3u3lf0t0w37&ep=v1_gifs_search&rid=giphy.webp&ct=g",
        "https://media2.giphy.com/media/3NtY188QaxDdC/giphy.webp?cid=ecf05e47tn43oc4ug16jvlncq9ih5hx2bzxtmq74a5xut78o&ep=v1_gifs_search&rid=giphy.webp&ct=g"
    ],
    "cat": [
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG1yeGM2YjhvaXJmZnAwd2xjcnhiMmM1aWU4NTNobDN4N3BzMTBjcyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mlvseq9yvZhba/giphy.webp",
        "https://media1.giphy.com/media/nR4L10XlJcSeQ/200.webp?cid=790b7611pmrxc6b8oirffp0wlcrxb2c5ie853hl3x7ps10cs&ep=v1_gifs_search&rid=200.webp&ct=g",
        "https://media4.giphy.com/media/CjmvTCZf2U3p09Cn0h/giphy.webp?cid=790b7611pmrxc6b8oirffp0wlcrxb2c5ie853hl3x7ps10cs&ep=v1_gifs_search&rid=giphy.webp&ct=g"
    ],
    "dog": [
        "https://media1.giphy.com/media/kiBcwEXegBTACmVOnE/giphy.webp?cid=790b7611csg98lpi2kg4dkq3b5311p3w6exv403g7jp2a4b2&ep=v1_gifs_search&rid=giphy.webp&ct=g",
        "https://media4.giphy.com/media/3oKIPsgVPHyPPG5p3a/200.webp?cid=790b7611csg98lpi2kg4dkq3b5311p3w6exv403g7jp2a4b2&ep=v1_gifs_search&rid=200.webp&ct=g",
        "https://media2.giphy.com/media/urKWmm7C2EGqI/giphy.webp?cid=ecf05e47uq4kcj1o967f39kbh9wp04xw9asf4rvr3ggne2wx&ep=v1_gifs_search&rid=giphy.webp&ct=g",
        "https://media0.giphy.com/media/26BRDa2XjVq5f81Vu/200.webp?cid=790b7611mckn70v24qje9d8dgtqjh2wlz55iptn95yho4iwf&ep=v1_gifs_search&rid=200.webp&ct=g"
    ],
    "space": [
        "https://media1.giphy.com/media/xUA7aW1ddSxtVT5zzi/giphy.webp?cid=790b7611mckn70v24qje9d8dgtqjh2wlz55iptn95yho4iwf&ep=v1_gifs_search&rid=giphy.webp&ct=g",
        "https://media0.giphy.com/media/TZf4ZyXb0lXXi/giphy.webp?cid=790b7611mckn70v24qje9d8dgtqjh2wlz55iptn95yho4iwf&ep=v1_gifs_search&rid=giphy.webp&ct=g",
        "https://media2.giphy.com/media/kiWlpxD6hXmvTL8dio/giphy.webp?cid=790b7611mckn70v24qje9d8dgtqjh2wlz55iptn95yho4iwf&ep=v1_gifs_search&rid=giphy.webp&ct=g",
        "https://media0.giphy.com/media/ieRxbjqtPZIx2LWJHR/200.webp?cid=790b7611mckn70v24qje9d8dgtqjh2wlz55iptn95yho4iwf&ep=v1_gifs_search&rid=200.webp&ct=g"
    ]
}


# Route to fetch GIFs based on the selected theme
@app.route('/api/gifs', methods=['GET'])
def get_gifs():
    theme = request.args.get('theme', '').lower()  # Get the theme query parameter
    gifs = gif_data.get(theme, [])  # Get the GIF list for the theme, or an empty list
    return jsonify(gifs)

if __name__ == '__main__':
    app.run(debug=True)
