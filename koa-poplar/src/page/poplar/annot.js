function getProto(content){
    return {
        "version":"0.0.1",
        "content": content,
        "labelCategories": [
            {
                "id": 0,
                "text": "名词",
                "color": "#eac0a2",
                "borderColor": "#a38671"
            },
            {
                "id": 1,
                "text": "动词",
                "color": "#619dff",
                "borderColor": "#436db2"
            },
            {
                "id": 2,
                "text": "形容词",
                "color": "#9d61ff",
                "borderColor": "#6d43b2"
            },
            {
                "id": 3,
                "text": "副词",
                "color": "#ff9d61",
                "borderColor": "#b26d43"
            }
        ],
        "labels": [
        ],
        "connectionCategories": [
            {
                "id": 0,
                "text": "修饰"
            },
            {
                "id": 1,
                "text": "限定"
            },
            {
                "id": 2,
                "text": "是...的动作"
            }
        ],
        "connections": [
        ]
    }
}

export{
    getProto,
}
