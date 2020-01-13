# URL

method: GET
url: /lines
params: {today:true}/{}
return {
"code": 200,
"data": [
{
"_id": "5e02d42edf5d9c9e6ce6c3ef",
"lines": "test112332112",
"character": "卡卡西 2",
"title": "火影忍者",
"japanese": "今日ちょっと人生という道に迷ってな",
"pic": "0102",
"__v": 0
}
]
}

method: POST

# first

method: POST
url: /upload
data-from {
file: Files{}
}
return {
"code": 200,
"description": "SUCCESS",
"md5": "fc16ee9738fbabb83b3dc199d99791a7"
}

# second

method: POST
url: /lines
params: {
"lines": "test112332112",
"character": "卡卡西 2",
"title": "火影忍者",
"japanese": "今日ちょっと人生という道に迷ってな",
"md5": "123123123123123",
}
return {
"code": 200,
"data": []
}
