package org.mvnsearch.account;

public class Stock {
    private Integer id;
    private String Name;

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    private String ticker;
    private Integer price;

    public Stock() {
    }

    public Stock(Integer id, String name,Integer price,String ticker) {
        this.id = id;
        this.Name = name;
        this.price = price;
        this.ticker = ticker;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        this.Name = name;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
}
