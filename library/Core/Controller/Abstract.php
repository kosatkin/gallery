<?php

abstract class Core_Controller_Abstract extends Zend_Controller_Action {

    protected function isAjax() {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
    }

    public function returnJson($data){
        // Fix for IE (seems that IE do not like application/json on HTML Form submission)
        header('Content-Type: ' . ($this->isAjax() ? 'application/json' : 'text/plain') . '; charset=utf-8');
        echo Zend_Json::encode($data);
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
    }
}